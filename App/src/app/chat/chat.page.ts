import { Component, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  @ViewChild('content', {static: false}) content: any;
  userName: string = '';
  message: string = '';
  messages = [];

  constructor(public navctrl: NavController) {
    this.getMessages();
  }


  getMessages() {
    let messagesRef = firebase.database().ref().child('mensajes');
    messagesRef.on('value', (snap) => {
      let data = snap.val();
      this.messages = [];
      for(let key in data){
        this.messages.push(data[key]);
      }
      this.scrollToBottom1();
    });
  }

  scrollToBottom1() {
    let contentEnd = document.getElementById('content-end').offsetTop;
    this.content.scrollToPoint(0, contentEnd, 300);
  }


  sendMessage() {
    let messagesRef =  firebase.database().ref().child('mensajes');
    messagesRef.push({mensaje: this.message, nombre: this.userName });
    this.message = '';
  }

}
