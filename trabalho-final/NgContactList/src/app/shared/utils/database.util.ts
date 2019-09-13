import { LocalStorageUtil } from './local-storage.util';
import { User } from '../../models/user.model';
import { Contact } from 'src/app/models/contact.model';

export class DatabaseUtil {

    private static storageName = 'ngcontactlist.database';

    public static getTableUser(): string {
        return `${this.storageName}.user`;
    }

    public static getTableContact(): string {
        return `${this.storageName}.contact`;
    }

    public static selectUsers(): User[] {
        return LocalStorageUtil.getList(this.getTableUser());
    }

    public static insertUsers(data: User[]): void {
        LocalStorageUtil.set(this.getTableUser(), data);
    }

    public static insertUser(user: User): void {
        let users = this.selectUsers();
        users.push(user);
        this.insertUsers(users);
    }

    public static updateUser(user: User, newPassword: string): void {
        let users = this.selectUsers();
        for (let index = 0; index < users.length; index++) {
            if (users[index].username === user.username) {
                users[index].password = newPassword;
                break;
            }
        }

        this.insertUsers(users);
    }

    public static selectContacts(): Contact[] {
        return LocalStorageUtil.getList(this.getTableContact());
    }

    public static insertContacts(data: Contact[]): void {
        LocalStorageUtil.set(this.getTableContact(), data);
    }

    public static insertContact(contact: Contact): void {
        let contacts = this.selectContacts();

        if (contacts.length) {
            let lastItem = contacts[contacts.length - 1];
            contact.id = lastItem.id + 1;
        } else {
            contact.id = 1;
        }

        if (!contact.image)
            contact.image = 'https://www.pena.com.br/wp-content/uploads/2017/05/user-icon-300x300.jpg';

        contacts.push(contact);
        this.insertContacts(contacts);
    }

    public static removeContact(contact: Contact): void {
        let contacts = this.selectContacts();
        for (let index = 0; index < contacts.length; index++) {
            const item = contacts[index];
            if (item.id === contact.id) {
                contacts.splice(index, 1);
            }
        }
        this.insertContacts(contacts);
    }

    public static updateContact(contact: Contact): void {
        let contacts = this.selectContacts();
        for (let index = 0; index < contacts.length; index++) {
            if (contacts[index].id === contact.id) {
                contacts[index] = contact;
                if (!contact.image)
                    contact.image = 'https://www.pena.com.br/wp-content/uploads/2017/05/user-icon-300x300.jpg';
                break;
            }
        }

        this.insertContacts(contacts);
    }

    public static selectContact(id: number): Contact {
        const contacts = LocalStorageUtil.getList(this.getTableContact());
        for (let index = 0; index < contacts.length; index++) {
            const contact = contacts[index];
            if (contact.id === id) {
                return contact;
            }
        }
        return null;
    }

    public static clear(): void {
        LocalStorageUtil.clear(this.storageName);
    }

}