import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TaskModel} from "./TaskModel";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs";

@Injectable()
export class TaskOverviewResolver implements Resolve<any> {

    constructor(private model: TaskModel) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
        return Observable.of(this.model.loadTasks(route.params['listId']));
    }
}