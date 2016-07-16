default: venv

venv: .venv/bin/activate
.venv/bin/activate: requirements.txt
	test -d .venv || virtualenv --python=`which python3` .venv
	.venv/bin/pip install -U pip
	.venv/bin/pip install -r requirements.txt
	touch .venv/bin/activate
