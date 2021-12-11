echo "Installing Dependency"
pip install transformers
pip install rank_bm25
pip install pipeline
pip install sanic
echo "Running Server"
python backend/app.py