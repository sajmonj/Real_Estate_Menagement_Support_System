import React, { useState, useEffect } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const CheckboxTree = ({ categories, setCategories, setIsFiltered }) => {
    const [expandedCategories, setExpandedCategories] = useState({});
    const [parentCategories, setParentCategories] = useState({
        Residential: false,
        Commercial: false
    });

    useEffect(() => {
        handleParentCheckbox();
    }, [categories]);

    const handleCategoryToggle = (category) => {
        setExpandedCategories((prevExpandedCategories) => ({
            ...prevExpandedCategories,
            [category]: !prevExpandedCategories[category],
        }));
    };

    const handleParentCheckbox = () => {
        setParentCategories({
            Residential: Object.keys(categories.Residential).every(
                (item) => categories.Residential[item]
            ),
            Commercial: Object.keys(categories.Commercial).every(
                (item) => categories.Commercial[item]
            ),
        });
        setIsFiltered(Object.keys(categories).some((category) =>
            Object.values(categories[category]).some((item) => item)
        ));
    };

    const handleParentCheckboxChange = (category) => {
        setCategories((prevCategories) => ({
            ...prevCategories,
            [category]: Object.keys(prevCategories[category]).reduce(
                (acc, item) => ({
                    ...acc,
                    [item]: !parentCategories[category],
                }),
                {}
            ),
        }));
    };

    const handleCheckboxChange = (category, item) => {
        setCategories((prevCategories) => ({
            ...prevCategories,
            [category]: {
                ...prevCategories[category],
                [item]: !prevCategories[category][item],
            },
        }));
    };

    return (
        <Form>
            {Object.entries(categories).map(([category, items]) => (
                <div key={category}>
                    <Form.Check
                        type="checkbox"
                        id={`parent-${category}`}
                        label={category}
                        checked={parentCategories[category]}
                        onChange={() => handleParentCheckboxChange(category)}
                        style={{ display: 'inline-block' }}
                    />
                    <button type="button" className="btn btn-light btn-sm"
                            style={{width: 30, height: 30, borderRadius: 10}}
                            onClick={() => handleCategoryToggle(category)} >
                        {expandedCategories[category] ? <FontAwesomeIcon icon={faChevronUp} size="xs"/> : <FontAwesomeIcon icon={faChevronDown} size="xs"/>}
                    </button>
                    <Collapse in={expandedCategories[category]}>
                        <div>
                            {Object.entries(items).map(([item, checked]) => (
                                <Form.Check
                                    key={item}
                                    type="checkbox"
                                    id={`${category}-${item}`}
                                    label={item}
                                    checked={checked}
                                    onChange={() => handleCheckboxChange(category, item)}
                                    style={{ marginLeft: '20px' }}
                                />
                            ))}
                        </div>
                    </Collapse>
                </div>
            ))}
        </Form>
    );
};
