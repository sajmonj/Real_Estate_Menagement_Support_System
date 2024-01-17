import React, { useState } from 'react';
// import '../style/Timeline.css';

const TimelineItem = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="timeline__item">
            <div className="timeline__item-header">
                <button className="timeline__arrow" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                    {/* SVG i inne elementy */}
                </button>
                <span className="timeline__dot"></span>
                <span className="timeline__meta">
                    <time className="timeline__date">{event.date}</time><br />
                    <strong className="timeline__title">{event.title}</strong>
                </span>
            </div>
            {isExpanded && (
                <div className="timeline__item-body">
                    <div className="timeline__item-body-content">
                        {event.description}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TimelineItem;
// export const Timeline = () => {
//     const [allExpanded, setAllExpanded] = useState(false);
//
//     const toggleAll = (expand) => {
//         setAllExpanded(expand);
//     };
//     return (
//         <div id="timeline" className="timeline">
//             <div className="btn-group">
//                 <button className="btn" onClick={() => toggleAll(true)}>Expand All</button>
//                 <button className="btn" onClick={() => toggleAll(false)}>Collapse All</button>
//             </div>
//             <TimelineItem id="item1" date="January 1, 1970" title="Unix Epoch" isExpanded={allExpanded}>
//                 <p>This is the day the Unix clock began...</p>
//             </TimelineItem>
//             <TimelineItem id="item1" date="January 1, 1970" title="Unix Epoch" isExpanded={allExpanded}>
//                 <p>This is the day the Unix clock began...</p>
//             </TimelineItem>
//             <TimelineItem id="item1" date="January 1, 1970" title="Unix Epoch" isExpanded={allExpanded}>
//                 <p>This is the day the Unix clock began...</p>
//             </TimelineItem>
//         </div>
//     );
// };
