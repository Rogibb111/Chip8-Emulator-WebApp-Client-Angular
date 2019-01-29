import { Component } from '@angular/core';
import { SettingsService } from './service/settings.service';
import { Start, Game } from './settings.objects';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  host: {
    class: "settings-container"
  }
})

export class SettingsComponent {
  gameForm = new FormGroup({
    game: new FormControl('', Validators.required),
    frequency: new FormControl('', Validators.required)
  });
  gameList: Game[];

  constructor(public settingsService: SettingsService) {}
  
  ngOnInit() {
    this.settingsService.getGames().subscribe(games => { 
      this.gameList = games; 
    });
  }

  onLaunch() {
    if(!this.gameForm.invalid) {
      const { game, frequency } = this.gameForm.value;
      const start = new Start(game, frequency);
      this.settingsService.startGame(start);
    }
  }
  
  onStopButtonClicked() {
    this.settingsService.stopGame();
  }
  
  onPausedButtonClicked() {
    
  }

  getErrorMessage(field){
    if(field === 'game'){
      return "Must select a game";
    } 
    return "Must select a CPU frequency";
  }
 }
