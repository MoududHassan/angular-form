interface CourseCategory{
  code: string;
  description: string;
}

import {Component, OnInit} from '@angular/core';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { courseTitleValidator } from '../../validators/course-title.validators';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {


  form = this.fb.group({
    title: ['', {
      validators:[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ],
      updateOn:'blur',
      asyncValidators: [courseTitleValidator(this.courseService)]
    }],
    releasedAt: [new Date(), {
      validators: [Validators.required]
    }],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['',[Validators.required, Validators.minLength(3)]],
    category: ['BEGINNER', Validators.required]
  });

  courseCategories$: Observable<CourseCategory[]>;

  constructor(private fb : FormBuilder, private courseService : CoursesService){

  }

  ngOnInit() {
    this.courseCategories$ = this.courseService.findCourseCategories();
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
