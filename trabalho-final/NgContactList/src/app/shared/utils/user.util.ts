import { LocalStorageUtil } from './local-storage.util';

export class UserUtil {

    private static storageName = 'ngcontactlist.user';

    public static get(): any {
        return LocalStorageUtil.get(this.storageName);
    }

    public static set(data: any): void {
        LocalStorageUtil.set(this.storageName, data);
    }

    public static clear(): void {
        LocalStorageUtil.clear(this.storageName);
    }

}