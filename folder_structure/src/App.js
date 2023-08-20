import { useState } from "react";
import Folder from "./components/folder/Folder";
import "./App.css";
import Display from "./components/display/Display";



const App = () => {
  const [tree, setTree] = useState(
    {
      "name": "root",
      "data": "",
      "path": "root",
    }
  );

  const [displayExport, setDisplayExport] = useState(false);

  const _createPath = (node, path) => {
    const numberOfChildren = (node.children || []).length;
    return `${path}.${numberOfChildren}`;
  }

  const addChild = (text,path, edit_data=false, edit_header=false) => {
    // path will help us to navigate in quicker time
    const splittedPath = path.split(".");
    // if the tree has no children, and there are no edits to header or text
    // then add a new node to children 
    if (!tree.children && !edit_data && !edit_header) {
      delete tree.data;
      setTree({...tree, children: [{name: _createPath(tree, path), data: text, path: _createPath(tree, path)}], });
      return;
    }
    // create a deep copy, so that we dont mutate the original
    let treeCopy = JSON.parse(JSON.stringify(tree));
    // pointer to be updated on each iteration
    let ptr = treeCopy;
    // since our path will always start with root., hence we are skipping the first path ie "root"
    for(const index of splittedPath.slice(1)) {
      const intIndex = parseInt(index);
      if (ptr.children && ptr.children.length > 0) {
        ptr = ptr.children[intIndex];
      }
    }
    if (edit_data) {
      ptr.data = text;
    } else if(edit_header) {
      ptr.name = text;
    } 
    else {
      if (!ptr.children) {
        ptr.children = []
      }
      ptr["children"].push({
        name: _createPath(ptr, path), data: text,
        path: _createPath(ptr, path)
      });
      delete ptr.data;
    }
    setTree(treeCopy);
  }

  

  const renderTree = (tree, path="", target="") => {
    // method to render tree
    // taking advantage of passing children components in props
    const props = {
      name: tree.name,
      children: [],
      addChild,
    }

    path = tree.path;

    if(!tree.children) {
      props.data = tree.data;
    } else {
      for (const child of tree.children) {
        const elem = renderTree(child, path+".", target);
        props.children.push(elem);
      }
    }
    props.path = path;  
    const parentNode = <Folder {...props} ></Folder>;
    return parentNode;
  };

  const checkDisplayExport = () => {
    if(displayExport) {
      return <Display export_json={tree} />
    } else {
      return <button onClick={e => setDisplayExport(!displayExport)}>Display Export</button>
    }
  }

  
  
  return (
    <>
      {renderTree(tree)}
      {checkDisplayExport()}
    </>
  )


}

export default App;