import { AppSettingItem } from './AppSettingItem';
import * as Common from '../common/index';
import * as Collections from '../collections/index';

export class AppSettings {
    private Items = new Collections.NamedDictionary<AppSettingItem>();

    get SettingItems(): AppSettingItem[] {
        return this.Items.Values();
    }

    /** Get a setting item by name. */
    GetItem(name: string, defaultValue?: any): AppSettingItem {
        if (!name)
            throw new Error('Given name is null.');

        let item = this.Items.Item(name);
        if (!item && defaultValue != null) {
            item = new AppSettingItem();
            item.Name = name;
            item.Value = defaultValue;
            this.Items.Add(name, item);
        }
        return item;
    }
    /** 
     * Add a setting item, if there is an item with same name, that item will
     * be updated.
     */
    AddItem(item: AppSettingItem): AppSettings {
        if (item && item.Name) {
            let existing = this.GetItem(item.Name);
            if (existing) {
                existing.Value = item.Value;
            } else {
                this.Items.Add(item.Name, item);
            }
        }
        return this;
    }
    /** 
     * Set setting item value 
     */
    SetValue(name: string, value: any): AppSettings {
        let item = this.GetItem(name);
        if (!item) {
            item = new AppSettingItem();
            item.Name = name;            
            this.Items.Add(name, item);
        }
        item.Value = value;
        return this;
    }
}