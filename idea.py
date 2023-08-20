import json
import uuid

tree = {"name": "root", "children": []}

def _create_name(tree, path):
    name = f"{path}.{len(tree.get('children', []))}"
    return name


# root.0

def renderTree(tree: dict, path="", parent_name=None, add_data=""):
    
    path = str(tree.get("name", ""))

    if add_data and parent_name == tree.get("name"):
        _ = tree.pop("data", "")
        tree.setdefault("children", []).append({
            "name": _create_name(tree, path),
            "data": add_data
        })
    
    
    if tree.get("data"):
        return
    
    # if (tree.get("data")):
    #     return tree.get("data")

    for child in tree.get("children", []):
        renderTree(child, path=f"{child.get('name')}.", parent_name=parent_name, add_data=add_data)

    return


def add_new():
    parent_name = input(">>>Enter parent name: ")
    child_data = uuid.uuid4().hex
    renderTree(tree, parent_name=parent_name, add_data=child_data)

def display():
    print("="*30)
    print(json.dumps(tree, indent=4))
    print("="*30)

while True:
    print("1: Adding new nodes")
    print("2: Display tree")
    option = int(input(">>> Enter your option: "))
    if option == 1:
        add_new()
        continue
    elif option == 2:
        display()
    else:
        break


