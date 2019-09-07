global _pypyjson
import _pypyjson

@taxa.route("/submit")
def submit():
    rawData = _pypyjson.loads(request.data)
    my_id = rawData["name"]
    my_value = rawData["value"]
    session[my_id] = my_value
    return

@taxa.route("/reveal")
def reveal():
    rawData = _pypyjson.loads(request.data)
    my_id = rawData["name"]
    my_opponent = rawData["opponent"]

    if my_opponent not in session:
        response.add("Opponent doesnt exist")
        return

    if session[my_id] >= session[my_opponent]:
        response.add("Your value is no less than your opponent")
    else:
        response.add("Your value is less than your opponent")
    return