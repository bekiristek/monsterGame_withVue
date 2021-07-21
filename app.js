new Vue({
    el: "#app",
    data: {
        player_healt: 100,
        monster_healt: 100,
        logs: [],
        game_is_on: false,
        attack_multiple: 10,
        special_attack_multiple: 25,
        healt_up_multiple: 20,
        monster_attack_multiple: 15,
        log_text: {
            attack: "PLAYER ATTACK :",
            special_attack: "SPECIAL PLAYER ATTACK : ",
            monster_attack: "MONSTER ATTACK : ",
            healt_up: "FIRST AID",
            give_up: "PLAYER GIVEN!!!"
        },
    },
    methods: {
        start_game: function () {
            this.game_is_on = true;
        },
        attack: function () {
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_healt -= point;
            this.add_to_log({ turn: "p", text: this.log_text.attack + point })
            this.monster_attack();
        },
        special_attack: function () {
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_healt -= point;
            this.add_to_log({ turn: "p", text: this.log_text.special_attack + point })
            this.monster_attack();
        },
        healt_up: function () {
            var point = Math.ceil(Math.random() * this.healt_up_multiple);
            this.player_healt += point;
            this.add_to_log({ turn: "p", text: this.log_text.healt_up + point })
            this.monster_attack();
        },
        give_up: function () {
            this.player_healt = 0;
            this.add_to_log({ turn: "p", text: this.log_text.give_up })
        },
        monster_attack: function () {
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.player_healt -= point;
            this.add_to_log({ turn: "m", text: this.log_text.monster_attack + point })
        },
        add_to_log: function (log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_healt: function (value) {
            if (value <= 0) {
                this.player_healt = 0;
                if (confirm("You lost the game. Do you want to try again?")) {
                    this.player_healt = 100;
                    this.monster_healt = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_healt = 100
            }
        },
        monster_healt: function (value) {
            if (value <= 0) {
                this.monster_healt = 0;
                if (confirm("You won the game. Do you want to try again?")) {
                    this.player_healt = 100;
                    this.monster_healt = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        player_progress: function () {
            return {
                width: this.player_healt + "%"
            }
        },
        monster_progress: function () {
            return {
                width: this.monster_healt + "%"
            }
        }
    }
})