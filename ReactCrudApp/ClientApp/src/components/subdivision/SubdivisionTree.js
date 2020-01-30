import React, { Component } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';

const stiles = {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
}

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.expanded,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event, checked, name, id) {
        if (checked)
            this.props.onSelect(id, name);
        else
            this.props.onSelect(0, '');
    }

    handleChange(event, nodes) {
        this.setState({ expanded: nodes });
        this.props.onTogle(nodes);
    }
    static renderTree(component) {
        return (
            <div>
                <TreeView
                    style={stiles}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeToggle={component.handleChange}
                    expanded={component.state.expanded}
                >
                    {component.props.data.map(el => (
                        Tree.renderTreeItem(el, component.handleSelect, component.props.selected)
                    ))}
                </TreeView>
            </div>
        );
    }

    static renderTreeItem(item, onSelect, selectedId) {
        let node;
        let selected = selectedId === item.id;
        if (item.childList.length > 0) {
            node = <TreeItem
                key={item.id}
                nodeId={item.id.toString()}
                label={Tree.renderLabelItem(item.subdivisionName, selected, onSelect, item.id)}
            >
                {item.childList.map(el => (
                    Tree.renderTreeItem(el, onSelect, selectedId)
                ))}
            </TreeItem>
        } else
            node = <TreeItem
                key={item.id}
                nodeId={item.id.toString()}
                label={Tree.renderLabelItem(item.subdivisionName, selected, onSelect, item.id)}
            />
        return node;
    }

    static renderLabelItem(name, selected, onSelect, id) {
        let subdivisionName = name;
        return (
            <div>
            <Checkbox
                color="default"
                    checked={selected}
                    onChange={(e, checked, name, subId) => onSelect(e, checked, subdivisionName, id)}
                    onClick={e => (e.stopPropagation())}
                />
                {subdivisionName}
                </div>
            );
    }

    render() {
        let contents = this.props.data.length === 0 ?
                <h2>Нет данных</h2>
                : Tree.renderTree(this);
        return (
            <div>
                {contents}
            </div>
        );
    }
}