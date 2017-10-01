import os

def post_build(path):
    print(os.path.basename(path), "-", os.stat(path).st_size, "bytes")