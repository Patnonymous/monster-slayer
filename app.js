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
        }
    }

});