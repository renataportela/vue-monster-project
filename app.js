new Vue({
   el: "#app",
   data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
   },
   methods: {
      startGame: function () {
         this.gameIsRunning = true;
         this.playerHealth = 100;
         this.monsterHealth = 100;
         this.turns = [];
      },

      attack: function () {
         if (this.playerAttacks(3, 10).checkWin()){
            return;
         }
         this.monsterAttacks();
      },

      specialAttack: function(){
         if (this.playerAttacks(10, 20).checkWin()){
            return;
         }
         this.monsterAttacks();
      },

      playerAttacks: function (min, max) {
         const damage = this.calculateDamage(min, max);
         this.monsterHealth -= damage;
         this.registerPlayerLog('Player hits monster for '+damage);
         return this;
      },

      monsterAttacks: function () {
         const damage = this.calculateDamage(5, 12);
         this.playerHealth -= damage;
         this.registerMonsterLog('Monster hits player for '+damage);
         this.checkWin();
      },

      heal: function () {

         if (this.playerHealth <= 90){
            this.playerHealth += 10;
         }
         else{
            this.playerHealth = 100;
         }
         this.registerPlayerLog('Player hels for 10.');
         this.monsterAttacks();
      },

      giveUp: function () {
         this.gameIsRunning = false;
         this.turns = [];
      },

      registerPlayerLog: function (text) {
         this.registerLog(true, text);
      },

      registerMonsterLog: function (text) {
         this.registerLog(false, text);
      },

      registerLog: function (isPlayer, text) {
         this.turns.unshift({
            isPlayer: isPlayer,
            text: text
         });
      },

      calculateDamage: function (min, max) {
         return Math.max(Math.floor(Math.random() * max) +1, min);
      },

      checkWin: function () {
         if (! this.hasHealth(this.monsterHealth))
         {
            this.askNewGame('You won! New Game?');
            return true;
         }
         else if (! this.hasHealth(this.playerHealth))
         {
            this.askNewGame('You lost! New Game?');
            return true;
         }
         return false;
      },

      hasHealth: function (health) {
         if (health <= 0){
            return this.gameIsRunning = false;
         }
         return true;
      },

      askNewGame: function (message) {
         if(confirm(message)) {
            this.startGame();
         }
      }
   }
});
