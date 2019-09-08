global _pypyjson
import _pypyjson

RECENT_KEY = 'recent'
MAX_RECENT = 10

'''
rawData: object of the form:

{
      timestamp: X # epoch timestamp
      recipient: '', # test@test.com
      sender: '', # test@test.com
      amount: '', # 100
      currency: '' # ETH
}
'''

@taxa.route("/create")
def myMethodA():
        global RECENT_KEY
        global MAX_RECENT
        print "[i] create handled!"
        rawData = _pypyjson.loads(request.data)
        sender = rawData["sender"]
        if sender not in session:
                session[sender] = []
        session[sender] = [rawData] + session[sender]

        if RECENT_KEY not in session:
                session[RECENT_KEY] = []
        session[RECENT_KEY] = [rawData] + session[RECENT_KEY]
        max_len = min(MAX_RECENT, len(session[RECENT_KEY]))
        session[RECENT_KEY] = session[RECENT_KEY][0:max_len] # store up to max_len items

        # return the added item
        msg = str(rawData)
        print('msg', msg)
        response.add(msg)
        return

@taxa.route("/list")
def myMethodB():
        global RECENT_KEY
        print "[i] list handled!"
        rawData = _pypyjson.loads(request.data)
        if 'email' in rawData:
                email = rawData['email'] # queried email
                if email in session:
                        data = session[email] # return transactions associated with email
                else:
                        data = [] # not found
        else:
                # if no email provided in query, return recent transactions
                data = session[RECENT_KEY]
        msg = str(data)
        print('msg', msg)
        response.add(msg) # return list
        return

@taxa.route("/reveal")
def reveal():
        rawData = _pypyjson.loads(request.data)
        recipient = rawData['recipient']
        response.add("Your recipient:")
        response.add(str(rawData))
