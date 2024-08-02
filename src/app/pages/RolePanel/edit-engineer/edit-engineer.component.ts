import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addEngineerComment } from '../../../interfaces/addEngineerComment';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-edit-engineer',
  templateUrl: './edit-engineer.component.html',
  styleUrl: './edit-engineer.component.css'
})
export class EditEngineerComponent {
  networkRequestId !: string;
  comment: string = '';

  constructor( private router: Router, private dbService: DashboardService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.networkRequestId = navigation.extras.state['id'];
      console.log(this.networkRequestId);
    }
  }

  onSubmit() {
    const addEngineerComment: addEngineerComment = {
      network_request_id: this.networkRequestId,
      comment: this.comment
    };
    this.dbService.addEngineerComment(addEngineerComment).subscribe((res) => {
      console.log(res);
    })
  }
}
