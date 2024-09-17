import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root',
})
export class SubcategoriesService {
    private apiUrl: string = '';
    private routeName: string = '';
    private categoriesRoute: string = '';
    constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
        this.apiUrl = this._GlobalService.apiHostName;
        this.routeName = this._GlobalService.subcategoriesRoute;
        this.categoriesRoute = this._GlobalService.categoriesRoute;
    }

    getSubcategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`);
    }

    getSubcategory(categoryId: string): Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${categoryId}`);
    }

    getSpecificSubcategories(categoryId: string, limit: number = 50, sort: string = 'name'): Observable<any> {
        return this._HttpClient.get(`${this.apiUrl}${this.categoriesRoute}/${categoryId}/subcategories?limit=${limit}&sort=${sort}`);
    }

    createSubcategory(formData: any): Observable<any> {
        return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    updateSubcategory(categoryId: string, formData: any): Observable<any> {
        return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${categoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    deleteSubcategory(categoryId: string): Observable<any> {
        return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${categoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
}
