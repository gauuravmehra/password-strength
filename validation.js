function Validation ($el, val) {
	this.el = $el;
	this.val = val;
}

Validation.prototype = {

	MinLength: function () {
		if (this.val.length >= 8) {
			return true;
		} else {
			return false;
		}
	},

	checkUpperCase: function () {
		var upperCase= new RegExp('[A-Z]');
		return upperCase.test(this.val);
	},

	checkLowerCase: function () {
		var lowerCase= new RegExp('[a-z]');
		return lowerCase.test(this.val);
	},

	checkNumbers: function () {
		var numbers = new RegExp('[0-9]');
		return numbers.test(this.val);
	},

	checkSymbols: function () {
		var special = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		return special.test(this.val);
	},

	checkSequentialChars: function () {
		var pattern = /^([a-z])\1+$/;
		return pattern.test(this.val);
	},

	validate: function () {
		var score = 0;
		var obj = {
			upperCase: false,
			lowerCase: false,
			special: false,
			numbers: false
		};

		if (this.MinLength()) {
			score++;

			if (this.checkUpperCase()) {
				obj.upperCase = true;
				score++;
			}
			if (this.checkLowerCase()) {
				obj.lowerCase = true;
				score++;
			}
			if (this.checkNumbers()) {
				obj.special = true;
				score++;
			}
			if (this.checkSymbols()) {
				obj.numbers = true;
				score++;
			}
			if (this.checkSequentialChars()) {
				score--;
			} else {
				score++;
			}
		}
		this.changeBar(score, obj);
	},

	changeBar: function (score, o) {
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
			color = '#ff9109';
			break;
			case 5:
			color = '#1dbc00';
			break;
			case 6:
			color = '#1dbc00';
		}

		$.each(o, function (k, v) {
			msg = 'Weak Password'
			if (v !== false) {
				msg = 'Strong Password'
			}
		});

		$(this.el).parents('.pwd-block').find('.pwd-strength-indicator').css({
			'background-color': color
		}).text(msg);
	}
};

var Password = {

	showValidation: function () {
		$('.pwd').on('keyup', function () {
			var el = new Validation($('.pwd'), $('.pwd').val());
			if (el.val !== '') {
				el.validate();
			}
		});
	},

	showIndicator: function () {
		$('.pwd').on('focusin', function () {
			$(this).parents('.pwd-block').find('.pwd-strength-indicator').removeClass('hidden');
		});

		$('.pwd').on('focusout', function () {
			if ($('.pwd').val() === '') {
				$(this).parents('.pwd-block').find('.pwd-strength-indicator').addClass('hidden');
				$(this).parents('.pwd-block').find('.pwd-strength-indicator').css({'background-color': '#ddd'}).text('');
			}
		});
	},

	showPassword: function () {
		$('.show-pwd').on('click', function () {
			if ($('.pwd').prop('type') === 'password') {
				$('.pwd').prop('type', 'text');
				$(this).text('Hide Password');
			} else {
				$('.pwd').prop('type', 'password');
				$(this).text('Show Password');
			}
		});
	},

	init: function () {
		this.showIndicator();
		this.showValidation();
		this.showPassword();
	}
};

Password.init();