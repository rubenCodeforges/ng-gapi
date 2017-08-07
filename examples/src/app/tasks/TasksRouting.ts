import {Route} from "@angular/router";
import {TaskOverviewComponent} from "./task/overview/TaskOverviewComponent";
import {TaskDetailComponent} from "./task/detail/TaskDetailComponent";
import {AuthGuard} from "../common/security/AuthGuard";
import {TaskOverviewResolver} from "./task/services/TaskOverviewResolver";

export const TasksRoutes: Route[] = [
    {
        path: 'taskList/:listId',
        component: TaskOverviewComponent,
        resolve: {
            tasks: TaskOverviewResolver
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'taskList/:listId/task/:id',
        component: TaskDetailComponent,
        canActivate: [AuthGuard]
    },
];
