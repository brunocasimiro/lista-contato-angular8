import { Component, OnInit } from '@angular/core';
import { UserUtil } from '../../utils/user.util';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = UserUtil.get();
  }

}
