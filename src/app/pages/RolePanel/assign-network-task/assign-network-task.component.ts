import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssignNetworkTask } from '../../../interfaces/assignNetworkTask';
import { Route, Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-assign-network-task',
  templateUrl: './assign-network-task.component.html',
  styleUrl: './assign-network-task.component.css'
})
export class AssignNetworkTaskComponent {
  form: FormGroup;
  options = ['Network', 'Server', 'Storage', 'Backup'];
  networkRequestId !: string;

  constructor(private fb: FormBuilder, private router: Router, private dbService: DashboardService) {
    this.form = this.fb.group({
      selectedOptions: [[]]
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.networkRequestId = navigation.extras.state['id'];
      console.log(this.networkRequestId)
    }
  }

  onSubmit() {
    const selectedValues = this.form.value.selectedOptions;
    const assignNetworkTask: AssignNetworkTask = {
      network_request_id: this.networkRequestId,
      isNetwork: selectedValues.includes('Network'),
      isServer: selectedValues.includes('Server'),
      isStorage: selectedValues.includes('Storage'),
      isBackup: selectedValues.includes('Backup')
    };

    this.dbService.assignNetworkTask(assignNetworkTask).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['na-table']);
    })

    console.log(assignNetworkTask);
  }
}
