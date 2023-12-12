import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stateForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  forbiddenName = 'Test';

  ngOnInit() {
    this.stateForm = new FormGroup({
      // 'name': new FormControl(null, [Validators.required, this.forbiddenNameChecker.bind(this)]),
      'name': new FormControl(null, [Validators.required], this.asyncForbiddenNameChecker),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });

    this.stateForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    )
  }

  forbiddenNameChecker(control: FormControl): {[s: string]: boolean} {
    if ((control.value) === 'Test') {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  asyncForbiddenNameChecker(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'nameIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.stateForm);
  }
}
