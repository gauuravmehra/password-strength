function Validation ($el) {
	this.el = $el;
	this.init();
};

Validation.prototype = {

	init: function () {
		var self = this;

		this.el.on('keyup', function (e) {
			var elm = $(this),
				val = elm.val();
			if (val !== '') {
				self.validate(val, elm);
			}
		});

		this.el.parents('.pwd-block').find('.show-pwd').on('click', function () {
			if ($(this).parents('.pwd-block').find('.pwd').prop('type') === 'password') {
				$(this).parents('.pwd-block').find('.pwd').prop('type', 'text');
				$(this).text('Hide Password');
			} else {
				$(this).parents('.pwd-block').find('.pwd').prop('type', 'password');
				$(this).text('Show Password');
			}
		});

		this.el.on('focusin', function () {
			$(this).parents('.pwd-block').find('.pwd-strength-indicator').removeClass('hidden');
		});

		this.el.on('focusout', function () {
			if ($(this).val() === '') {
				$(this).parents('.pwd-block').find('.pwd-strength-indicator').addClass('hidden');
				$(this).parents('.pwd-block').find('.pwd-strength-indicator .progress-bar').css({'background-color': '#ddd'}).text('0%');
			}
		});
	},

	MinLength: function (val) {
		if (val.length >= 8) {
			return true;
		} else {
			return false;
		}
	},

	checkUpperCase: function (val) {
		var upperCase= new RegExp('[A-Z]');
		return upperCase.test(val);
	},

	checkLowerCase: function (val) {
		var lowerCase= new RegExp('[a-z]');
		return lowerCase.test(val);
	},

	checkNumbers: function (val) {
		var numbers = new RegExp('[0-9]');
		return numbers.test(val);
	},

	checkSymbols: function (val) {
		var special = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		return special.test(val);
	},

	checkSequentialChars: function (val) {
		var pattern = /^([a-z])\1+$/;
		return pattern.test(val);
	},

	validate: function (val, el) {
		var score = 0;
		var obj = {
			upperCase: false,
			lowerCase: false,
			special: false,
			numbers: false
		};

		if (this.MinLength(val)) {
			score++;

			if (this.checkUpperCase(val)) {
				obj.upperCase = true;
				score++;
			}
			if (this.checkLowerCase(val)) {
				obj.lowerCase = true;
				score++;
			}
			if (this.checkNumbers(val)) {
				obj.special = true;
				score++;
			}
			if (this.checkSymbols(val)) {
				obj.numbers = true;
				score++;
			}
			if (this.checkSequentialChars(val)) {
				score--;
			} else {
				score++;
			}
		}
		this.changeBar(score, obj, el);
	},

	changeBar: function (score, o, el) {
		var color, msg;

		switch (score) {
			case 0:
			color = '#f00';
			break;
			case 1:
			color = '#f00';
			break;
			case 2:
			color = '#f00';
			break;
			case 3:
			color = '#ff9109';
			break;
			case 4:
			color = '#ff8109';
			break;
			case 5:
			color = '#1dbc00';
			break;
			case 6:
			color = '#2eff08';
		}

		$.each(o, function (k, v) {
			msg = 'Weak Password'
			if (v !== false) {
				msg = 'Strong Password'
			}
		});

		var progress = Math.round((score * 100)/6) === 0 ? 10 : Math.round((score * 100)/6);
		el.parents('.pwd-block').find('.progress-bar').css({
			'background-color': color,
			'width': progress +'%'
		}).text(msg);
	}
};

var el = new Validation($('.pwd'));