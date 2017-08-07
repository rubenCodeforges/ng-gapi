import {NgModule} from "@angular/core";
import {TaskListComponent} from "./taskList/TaskListComponent";
import {TaskListResource} from "./taskList/services/TasklistResource";
import {TaskListModel} from "./taskList/services/TasklistModel";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule} from "@ngx-translate/core";
import {TaskOverviewComponent} from "./task/overview/TaskOverviewComponent";
import {TaskDetailComponent} from "./task/detail/TaskDetailComponent";
import {RouterModule} from "@angular/router";
import {TasksRoutes} from "./TasksRouting";
import {TasklistActionButtons} from "./taskList/actionButtons/TasklistActionButtons";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TasklistCreateModalComponent} from "./taskList/modal/TasklistCreateModalComponent";
import {FormsModule} from "@angular/forms";
import {TasklistEditModalComponent} from "./taskList/modal/TasklistEditModalComponent";
import {TaskResource} from "./task/services/TaskResource";
import {TaskModel} from "./task/services/TaskModel";
import {TaskCreateModalComponent} from "./task/modal/TaskCreateModalComponent";
import {DragulaModule} from "ng2-dragula";
import {TaskOverviewResolver} from "./task/services/TaskOverviewResolver";

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule,
        NgbModule,
        DragulaModule,
        FormsModule,
        RouterModule.forChild(TasksRoutes)
    ],
    declarations: [
        TaskListComponent,
        TaskCreateModalComponent,
        TaskOverviewComponent,
        TaskDetailComponent,
        TasklistCreateModalComponent,
        TasklistEditModalComponent,
        TasklistActionButtons
    ],
    exports: [
        TaskListComponent,
        TasklistActionButtons
    ],
    providers: [
        TaskListResource,
        TaskListModel,
        TaskResource,
        TaskModel,
        TaskOverviewResolver
    ],
    entryComponents: [
        TasklistCreateModalComponent,
        TasklistEditModalComponent,
        TaskCreateModalComponent
    ]
})
export class TasksModule {

}