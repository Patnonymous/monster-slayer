new Vue ({
    el: '#app',
    data: {
        playerHP: 100,
        monsterHP: 100,
        gameRunning: false
    },
    methods: {
        startGame: function() {
            this.gameRunning = true;
            this.playerHP = 100;
            this.monsterHP = 100;
        },
        attack: function() {
            this.monsterHP -= this.calculateDamage(2, 10);
            if (this.checkResult()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function() {
            this.monsterHP -= this.calculateDamage(8, 25);
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
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameRunning = false;
        },
        monsterAttack: function() {
            this.playerHP -= this.calculateDamage(5, 15);
            this.checkResult();
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