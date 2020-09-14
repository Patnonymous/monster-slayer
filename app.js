new Vue ({
    el: '#app',
    data: {
        playerHP: 100,
        monsterHP: 100,
        gameRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameRunning = true;
            this.playerHP = 100;
            this.monsterHP = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(2, 10);
            this.monsterHP -= damage;
            this.turns.unshift({
                isPlayerTurn: true,
                info: 'Player damages monster for ' + damage
            });
            if (this.checkResult()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(8, 25);
            this.monsterHP -= damage;
            this.turns.unshift({
                isPlayerTurn: true,
                info: 'Player special attack hits for ' + damage
            });

            if (this.checkResult()) {
                return;
            }
            this.monsterAttack();

        },
        heal: function() {
            if (this.playerHP <= 90) {
                this.playerHP += 10;
            }
            else {
                this.playerHP = 100;
            }
            this.turns.unshift({
                isPlayerTurn: true,
                info: 'Player healed'
            });
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameRunning = false;
        },
        monsterAttack: function() {
            var damage = this.calculateDamage(5, 15);
            this.playerHP -= damage;
            this.checkResult();
            this.turns.unshift({
                isPlayerTurn: false,
                info: 'Monster damages player  for ' + damage
            });
        },
        calculateDamage: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkResult: function() {
            if (this.monsterHP <= 0) {
                if(confirm('Winner! Start a new game?')) {
                    this.startGame();
                }
                else {
                    this.gameRunning = false;
                }
                return true;
            }
            else if (this.playerHP <= 0) {
                if(confirm('Loser! Start a new game?')) {
                    this.startGame();
                }
                else {
                    this.gameRunning = false;
                }
                return true;
            }
            return false;
        }
    }

});