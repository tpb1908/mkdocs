import os
from pluginbase import PluginBase

def get_plugin_source():
    plugin_base = PluginBase(package="mkdocs.plugins")
    dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../plugins")
    plugin_source = plugin_base.make_plugin_source(searchpath=[dir])
    return plugin_source

def get_plugins():
    plugins = []
    dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../plugins")
    for path in os.listdir(dir):
        if path != "__init__.py" and path.endswith(".py"):
            plugins.append(get_plugin_source().load_plugin(path[:-3]))

    return plugins

def call_post_build(path):
    source = get_plugin_source()
    for plugin_name in source.list_plugins():
        mod = source.load_plugin(plugin_name)
        mod.post_build(path)

def pre_build(path):
    print("THIS IS EXAMPLE PLUGIN!", path)
