import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn{
    return (form: FormGroup): Validators | null =>{
        const start = form.get('promoStartAt').value;
        const end = form.get('promoEndAt').value;

        if(start && end){
            const isRangeValid = (end?.getTime() - start?.getTime() > 0);
            return isRangeValid ? null : {"promoPeriod":true};
        }else{
            return null;
        }
        
        
    }
}