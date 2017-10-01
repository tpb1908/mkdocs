import os
import shlex
import logging
import subprocess


def post_build(path):
    run_location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    js_path = run_location.split("/mkdocs")[0] + "/mkdocs/node/index.js"
    run_shell_command("node " + js_path + " " + str(path))


def run_shell_command(command_line):
    command_line_args = shlex.split(command_line)

    print ('Subprocess: "' + command_line + '"')

    try:
        command_line_process = subprocess.Popen(
            command_line_args,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )

        process_output, errors = command_line_process.communicate()

        # process_output is now a string, not a file,
        # you may want to do:
        # process_output = StringIO(process_output)
        print ("Process output is " + str(process_output.decode('utf-8').splitlines()))
    except (Exception) as exception:

        logging.error('Exception occurred: ' + str(exception))
        logging.info('Subprocess failed')
        return False
    else:
        # no exception was raised
        logging.info('Subprocess finished')

    return True
