import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
    siteLink: string = '';
    constructor(private _GlobalService: GlobalService) {
        this.siteLink = `${this._GlobalService.siteLink}/home`;
    }
}
