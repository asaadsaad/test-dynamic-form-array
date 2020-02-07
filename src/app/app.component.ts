import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  
    <form nz-form [formGroup]="myForm" (ngSubmit)='log()'>
    <h1>Edit Unpublished Book</h1>
    <nz-form-item>
        <nz-form-label [nzSpan]="5">Author</nz-form-label>
        <nz-form-control [nzSpan]="19">
            <input nz-input formControlName="author" />
        </nz-form-control>
    </nz-form-item>

    <nz-form-control [nzOffset]="5">
    <nz-collapse nzAccordion>
      <nz-collapse-panel *ngFor="let toc of myForm.get('form_titles')['controls']; let i=index;" [nzHeader]="toc.value">
        <nz-form-item>
          <nz-form-label [nzSpan]="4">Chapter Title</nz-form-label>
          <nz-form-control [nzSpan]="20"><input nz-input [formControl]="toc" /></nz-form-control>
          <nz-form-label [nzSpan]="4">Chapter Content</nz-form-label>
          <nz-form-control [nzSpan]="20"><textarea  nz-input rows="5" placeholder="Please copy/paste the content from the book attachment" [formControl]="myForm.get('form_contents')['controls'][i]"></textarea></nz-form-control>
        </nz-form-item>
      </nz-collapse-panel>
    </nz-collapse>
    </nz-form-control>

    <nz-form-control [nzSpan]="18" [nzOffset]="5">
    <button nz-button type="submit" nzType="primary">Submit</button>
</nz-form-control>
</form>
  `, styles: [
    `
      [nz-form] {
        max-width: 900px;
      }
      h1{
        text-align: center;
      }
      textarea{
        margin-top: 5px;
      }
    `
  ]
})
export class AppComponent {
  form_ready: Boolean = true;
  myForm: FormGroup;

  toc_chapters = [
    {
      title: 'This is panel header 1',
      content: 'content 1'
    },
    {
      title: 'This is panel header 2',
      content: 'content 2'
    },
    {
      title: 'This is panel header 3',
      content: 'content 3'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      author: [''],
      form_titles: this.formBuilder.array([]),
      form_contents: this.formBuilder.array([])
    });
  }

  ngAfterViewInit() {
    const form_titles = <FormArray>this.myForm.get('form_titles');
    const form_contents = <FormArray>this.myForm.get('form_contents');

    setTimeout(() => {
      this.toc_chapters.forEach(toc => {
        form_titles.push(this.formBuilder.control(toc.title))
        form_contents.push(this.formBuilder.control(toc.content))
      })
    }, 0)
  }

  log() {
    console.log(this.myForm.value)
  }
}
