import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { WsService } from '../../services/ws.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    FormsModule, 
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  protected userName = '';
  protected message: string = '';
  protected messages: String[] = [];
  protected isUserConnected: boolean = false;

  constructor(private wsService: WsService) {}

  ngOnInit() {
    this.wsService.subscribeToMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  public onSubmitUser() {
    console.log(this.userName);
    this.wsService.connectNewUser(this.userName);
    this.isUserConnected = true;
  }

  public onSubmitMessage() {
    this.wsService.sendMessage(this.message);
    this.message = '';
  }
}
