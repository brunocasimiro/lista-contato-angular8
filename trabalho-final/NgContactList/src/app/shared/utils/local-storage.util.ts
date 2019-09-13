export class LocalStorageUtil {

    public static get(storageName: string): any {
        const data = localStorage.getItem(storageName);
        if (!data) return null;
        return JSON.parse(data);
    }

    public static getList(storageName: string): any {
        const items = LocalStorageUtil.get(storageName);
        if(items)
            return items;
        return [];
    }

    public static set(storageName: string, data: any): void {
        localStorage.setItem(storageName, JSON.stringify(data));
    }

    public static clear(storageName: string): void {
        localStorage.removeItem(storageName);
    }

}