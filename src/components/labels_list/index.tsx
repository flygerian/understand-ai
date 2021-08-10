import { Select } from 'antd'

interface LabelsListProps {
    inputFieldLabel: string,
    labelsToPickFrom: string[],
    required: boolean,
    currentlySelectedLabel?: string,
    onLabelSelected(label: string): void
}

export default function LabelsList(props: LabelsListProps) {
    return (
        <div className="w-100 pa2">
            <h2>{props.inputFieldLabel} {props.required ? <i>(req)</i> : null}</h2>
            <Select className="w-100" value={props.currentlySelectedLabel} onChange={props.onLabelSelected}>
                {props.labelsToPickFrom.map(label => <Select.Option value={label} key={label}>{label}</Select.Option>)}
            </Select>
        </div>
    )
}