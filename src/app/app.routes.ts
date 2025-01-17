import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminPostComponent } from './components/admin/admin-post/admin-post.component';
import { LoginComponent } from './components/login/login.component';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificationComponent } from './components/verification/verification.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'setting', component: UserSettingComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'verification/:id', component: VerificationComponent},
    {
        path: 'admin', component: AdminDashboardComponent,
        children: [
            {
                path: 'posts', component: AdminPostComponent
            },
        ]
    },
];
// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class PublicRoutingModule { }
