import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  }]
})
export class FileUploadComponent implements ControlValueAccessor, Validator{

  @Input()
  requiredFileType:string;
  fileName = '';
  fileUploadError = false;
  uploadProgress:number;
  onChange:(fileName: string) => {};
  onTouched:() => {};
  disabled:boolean = false;
  fileUploadSuccess = false;

  constructor(private httpClient:HttpClient){

  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(this.fileUploadSuccess){
      return null;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType
    }

    if(this.fileUploadError){
      errors.uploadFailed = true;
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  writeValue(value: any) {
    this.fileName = value;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onClick(fileUpload: HTMLInputElement){
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event){
    const file:File = event.target.files[0];
    if(file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.fileUploadError = false;
      this.httpClient.post('/api/thumbnail-upload', formData,{
        reportProgress:true,
        observe:'events'
      })
      .pipe(
        catchError
        (
          error=>{
          this.fileUploadError = true;
          return of(error);
          }
        ),
        finalize(()=>{
          this.uploadProgress = null;
        })
      )
      .subscribe(event => {
        if(event.type == HttpEventType.UploadProgress){
          this.uploadProgress = Math.round(100*(event.loaded / event.total));
        }else if(event.type == HttpEventType.Response){
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
        }
      });
    }
    }
    

}
