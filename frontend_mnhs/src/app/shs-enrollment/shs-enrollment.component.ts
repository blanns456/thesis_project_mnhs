import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shs-enrollment',
  templateUrl: './shs-enrollment.component.html',
  styleUrls: ['./shs-enrollment.component.scss'],
})
export class ShsEnrollmentComponent implements OnInit {
  uploadForm!: FormGroup;
  imageURL: string | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      avatar: [''],
    });
  }

  showPreview(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.uploadForm!.patchValue({
        avatar: file,
      });
      this.uploadForm!.get('avatar')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
