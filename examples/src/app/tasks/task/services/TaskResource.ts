import {Injectable} from "@angular/core";
import {GoogleTasksApi} from "../../../config/GoogleTasksApi";
import {HttpService} from "../../../common/http/HttpService";
import {UserService} from "../../../common/user/UserService";
import {Observable} from "rxjs";
import {ListResponse} from "../../_internal/ListResponse";
import {Headers} from "@angular/http";

@Injectable()
export class TaskResource {
    private readonly ENDPOINT_URL: string = GoogleTasksApi.URL + '/lists';
    private authHeader: Headers = new Headers();

    constructor(private httpService: HttpService,
                private userService: UserService) {
        this.authHeader.append('Authorization', 'Bearer ' + userService.getToken())
    }

    findAll(tasklistId: string): Observable<TaskListResponse> {
        let url = `${this.ENDPOINT_URL}/${tasklistId}/tasks`;
        return this.httpService.get(url, {headers: this.authHeader});
    }


    findById(tasklistId: string, id: string): Observable<Task> {
        let url = `${this.ENDPOINT_URL}/${tasklistId}/tasks`;
        return this.httpService.get(url + "/" + id, {headers: this.authHeader})
    }

    create(tasklistId: string, task: Task): Observable<Task> {
        let url = `${this.ENDPOINT_URL}/${tasklistId}/tasks`;
        return this.httpService.post(url, task, {headers: this.authHeader})
    }

    update(tasklistId: string, task: Task): Observable<Task> {
        let url = `${this.ENDPOINT_URL}/${tasklistId}/tasks`;
        return this.httpService.put(url + "/" + task.id, task, {headers: this.authHeader})
    }

    delete(tasklistId: string, id: string): Observable<void> {
        let url = `${this.ENDPOINT_URL}/${tasklistId}/tasks`;
        return this.httpService.get(url + "/" + id, {headers: this.authHeader})
    }
}

export interface TaskListResponse extends ListResponse {
    items: Task[]
}

export interface Task {
    kind: string;
    id: string;
    etag: string;
    title: string;
    updated: Date;
    selfLink: string;
    parent: string;
    position: string;
    notes: string;
    status: string;
    due: Date;
    completed: Date;
    deleted: boolean;
    hidden: boolean;
    links: [
        {
            type: string;
            description: string;
            link: string;
        }
        ]
}