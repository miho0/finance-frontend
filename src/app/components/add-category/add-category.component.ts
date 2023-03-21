import { Component, OnInit } from '@angular/core';
import {Category} from "../../interfaces/Category";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss', '../../forms.scss']
})
export class AddCategoryComponent implements OnInit {

  public category: Category = {name: "", description: "", priority: 0};
  public errorMessage: string = "";
  public successMessage: string = "";

  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
  }

  public buttonPressed = () => {
    if (this.category.name != "") {
      this.backend.addCategory(this.category).subscribe(
        (res) => {
          if (res.status === "success") {
            this.successMessage = res.message;
          } else {
            this.errorMessage = res.message;
          }
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      this.errorMessage = "please, provide a category name."
    }
  }

}
