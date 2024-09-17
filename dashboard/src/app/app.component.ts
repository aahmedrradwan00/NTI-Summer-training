import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenubarComponent } from './menubar/menubar.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, HomeComponent, MenubarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    isLogin: boolean = false;
    constructor(private _AuthService: AuthService) {}
    ngOnInit(): void {
        this._AuthService.currentUser.subscribe({
            next: () => {
                if (this._AuthService.currentUser.getValue() !== null) this.isLogin = true;
                else this.isLogin = false;
            },
        });
    }
}
