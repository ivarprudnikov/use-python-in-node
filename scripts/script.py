#!/usr/bin/python

import sys, getopt, time

def main(argv):
    argument = ''
    usage = 'usage: script.py -f <sometext>'
    try:
        opts, args = getopt.getopt(argv,"hf:",["foo="])
    except getopt.GetoptError:
        print(usage)
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print(usage)
            sys.exit()
        elif opt in ("-f", "--foo"):
            argument = arg

    print("Start : %s" % time.ctime())
    time.sleep( 5 )
    print('Foo is')
    time.sleep( 5 )
    print(argument)
    print("End : %s" % time.ctime())

if __name__ == "__main__":
    main(sys.argv[1:])
