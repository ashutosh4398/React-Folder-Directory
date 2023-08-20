import "./Display.css";

const Display = ({export_json}) => {

    const usefulKeys = ["name", "children", "data"]

    const cleanData = node => {
        const treeNode = {
            name: node.name,
        }
        if (node.data || node.data === "") {
            for(const key of usefulKeys) {
                if (key in node) {
                    treeNode[key] = node[key]
                }
            }
            return treeNode
        }

        if(!node.children){
            return treeNode;
        }
        const children = []
        for (const child of node.children) {
            const data = cleanData(child);
            children.push(data);
        }
        if (children.length > 0) {
            treeNode.children = children;
        }
        return treeNode;
    };

    

    return (
        <div className="display">
            {JSON.stringify(cleanData(export_json), null, 4)}
        </div>
    )
}

export default Display;