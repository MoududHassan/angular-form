import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { min } from 'moment';
import { createPromoRangeValidator } from '../../validators/date-range.validators';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {


  form = this.fb.group({
    courseType:['premium', Validators.required],
    price:[null,[
      Validators.required,
      Validators.max(9999),
      Validators.min(1),
      Validators.pattern('[0-9]+')
    ]],
    promoStartAt:[null],
    promoEndAt:[null],
    thumbnail:[null]
  },{
    validators:[createPromoRangeValidator()]
  });

  constructor(private fb: FormBuilder){
    
  }

  ngOnInit() {

    this.form.valueChanges.subscribe(data => {
      const priceValue = this.form.controls['price'];
      if (data.courseType == 'free' && priceValue.enable){
        priceValue.disable({emitEvent:false});
      }else if(data.courseType == 'premium' && priceValue.disable){
        priceValue.enable({emitEvent:false});
      }
    });

  }

  get courseType(){
     return this.form.controls['courseType'].value.match("premium");
  }

}
