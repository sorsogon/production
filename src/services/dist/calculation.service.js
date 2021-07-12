"use strict";
exports.__esModule = true;
exports.heavyEquipmentRental = exports.accountableForm = exports.spaceRentalTax = exports.sandGravelTax = exports.amusementTax = exports.printingTax = exports.franchiseTax = exports.annualFixedTax = exports.professionalTax = void 0;
exports.professionalTax = function (profession, due_at, paid_at, penalty) {
    var paid_year = new Date(paid_at).getFullYear();
    var paid_month = new Date(paid_at).getMonth() + 1;
    var surcharge = penalty.surcharge, interest = penalty.interest, max_interest = penalty.max_interest;
    var surcharge_fee = {
        desc: "Surcharge",
        amount: 0
    };
    var interest_fee = {
        desc: "Interest",
        amount: 0
    };
    var tax = {
        desc: due_at + " PTR as " + profession.title,
        amount: profession.rate
    };
    var collection = {};
    var interest_rate = 0;
    if (paid_year != due_at && paid_month > 0) {
        interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
        if (interest_rate < max_interest) {
            interest_fee.amount = profession.rate * interest_rate;
        }
        else {
            interest_fee.amount = profession.rate * max_interest;
        }
        surcharge_fee.amount = profession.rate * surcharge;
        collection = {
            id: profession.id,
            category: {
                desc: tax.desc,
                title: profession.title,
                rate: profession.rate
            },
            items: [tax, surcharge_fee, interest_fee]
        };
    }
    else if (paid_year == due_at && paid_month > 1) {
        interest_rate = paid_month * interest;
        if (interest_rate < max_interest) {
            interest_fee.amount = profession.rate * interest_rate;
        }
        else {
            interest_fee.amount = profession.rate * max_interest;
        }
        surcharge_fee.amount = profession.rate * surcharge;
        collection = {
            id: profession.id,
            category: {
                desc: tax.desc,
                title: profession.title,
                rate: profession.rate
            },
            items: [tax, surcharge_fee, interest_fee]
        };
    }
    else {
        collection = {
            id: profession.id,
            category: {
                desc: tax.desc,
                title: profession.title,
                rate: profession.rate
            },
            items: [tax]
        };
    }
    return collection;
};
exports.annualFixedTax = function (vehicle, due_at, paid_at, penalty) {
    var paid_year = new Date(paid_at).getFullYear();
    var paid_month = new Date(paid_at).getMonth() + 1;
    var surcharge = penalty.surcharge, interest = penalty.interest, max_interest = penalty.max_interest;
    var vehicle_fee = vehicle.category.rate;
    var collection = {};
    var interest_rate = 0;
    var surcharge_fee = {
        desc: "Surcharge",
        amount: 0
    };
    var interest_fee = {
        desc: "Interest",
        amount: 0
    };
    var tax = {
        desc: due_at + " Tax Due for " + vehicle.plate_number,
        amount: vehicle_fee
    };
    if (paid_year != due_at && paid_month > 0) {
        interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
        if (interest_rate < max_interest) {
            interest_fee.amount = vehicle_fee * interest_rate;
        }
        else {
            interest_fee.amount = vehicle_fee * max_interest;
        }
        surcharge_fee.amount = vehicle_fee * surcharge;
        collection = {
            id: vehicle.id,
            category: {
                desc: tax.desc,
                category: vehicle.category
            },
            vehicle: {
                id: vehicle.id,
                model: vehicle.model,
                plate_number: vehicle.plate_number
            },
            plate_number: vehicle.plate_number,
            items: [tax, surcharge_fee, interest_fee]
        };
    }
    else if (paid_year == due_at && paid_month > 1) {
        interest_rate = paid_month * interest;
        if (interest_rate < max_interest) {
            interest_fee.amount = vehicle_fee * interest_rate;
        }
        else {
            interest_fee.amount = vehicle_fee * max_interest;
        }
        surcharge_fee.amount = vehicle_fee * surcharge;
        collection = {
            id: vehicle.id,
            category: {
                desc: tax.desc,
                category: vehicle.category
            },
            vehicle: {
                id: vehicle.id,
                model: vehicle.model,
                plate_number: vehicle.plate_number
            },
            plate_number: vehicle.plate_number,
            items: [tax, surcharge_fee, interest_fee]
        };
    }
    else {
        collection = {
            id: vehicle.id,
            category: {
                desc: tax.desc,
                category: vehicle.category
            },
            vehicle: {
                id: vehicle.id,
                model: vehicle.model,
                plate_number: vehicle.plate_number
            },
            plate_number: vehicle.plate_number,
            items: [tax]
        };
    }
    return collection;
};
exports.franchiseTax = function (franchise, gross_annual, due_at, paid_at, penalty, rates) {
    var paid_month = new Date(paid_at).getMonth() + 1;
    var paid_year = new Date(paid_at).getFullYear();
    var paid_day = new Date(paid_at).getDate();
    var surcharge = penalty.surcharge, interest = penalty.interest, max_interest = penalty.max_interest;
    var interest_rate = 0;
    var collection = {};
    var surcharge_fee = {
        desc: "Surcharge",
        amount: 0
    };
    var interest_fee = {
        desc: "Interest",
        amount: 0
    };
    var tax_due = {
        desc: due_at + " Franchise Tax for " + franchise.name,
        amount: gross_annual * rates.rate
    };
    if (paid_year != due_at) {
        if (paid_month > 0) {
            interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
            if (interest_rate < max_interest) {
                interest_fee.amount = tax_due.amount * interest_rate;
            }
            else {
                interest_fee.amount = tax_due.amount * max_interest;
            }
            surcharge_fee.amount = tax_due.amount * surcharge;
            collection = {
                id: franchise.id,
                category: {
                    desc: tax_due.desc,
                    rate: rates.rate
                },
                business: {
                    name: franchise.name
                },
                items: [tax_due, surcharge_fee, interest_fee]
            };
        }
    }
    else if (paid_year == due_at) {
        if (paid_month > 0) {
            if (paid_month == 1 && paid_day <= 20) {
                collection = {
                    id: franchise.id,
                    category: {
                        desc: tax_due.desc,
                        rate: rates.rate
                    },
                    business: {
                        name: franchise.name
                    },
                    items: [tax_due]
                };
            }
            else {
                interest_rate = paid_month * interest;
                if (interest_rate < max_interest) {
                    interest_fee.amount = tax_due.amount * interest_rate;
                }
                else {
                    interest_fee.amount = tax_due.amount * max_interest;
                }
                surcharge_fee.amount = tax_due.amount * surcharge;
                collection = {
                    id: franchise.id,
                    category: {
                        desc: tax_due.desc,
                        rate: rates.rate
                    },
                    business: {
                        name: franchise.name
                    },
                    items: [tax_due, surcharge_fee, interest_fee]
                };
            }
        }
    }
    return collection;
};
exports.printingTax = function (gross_annual, paid_at, due_at, penalty) {
    var paid_month = new Date(paid_at).getMonth() + 1;
    var paid_year = new Date(paid_at).getFullYear();
    var paid_day = new Date(paid_at).getDate();
    var surcharge = penalty.surcharge, interest = penalty.interest, max_interest = penalty.max_interest, tax_fee = penalty.tax_fee;
    var interest_rate = 0;
    var collection = {};
    var surcharge_fee = {
        desc: "Surcharge",
        amount: 0
    };
    var interest_fee = {
        desc: "Interest",
        amount: 0
    };
    var tax_due = {
        desc: "Tax Due",
        amount: gross_annual * tax_fee
    };
    if (paid_year != due_at) {
        if (paid_month > 0) {
            interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
            console.log(interest_rate);
            if (interest_rate < max_interest) {
                interest_fee.amount = tax_due.amount * interest_rate;
            }
            else {
                interest_fee.amount = tax_due.amount * max_interest;
            }
            surcharge_fee.amount = tax_due.amount * surcharge;
            collection = { id: 1, items: [tax_due, surcharge_fee, interest_fee] };
        }
    }
    else if (paid_year == due_at) {
        if (paid_month > 0) {
            if (paid_month == 1 && paid_day <= 20) {
                collection = { id: 1, items: [tax_due] };
            }
            else {
                interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
                if (interest_rate < max_interest) {
                    interest_fee.amount = tax_due.amount * interest_rate;
                }
                else {
                    interest_fee.amount = tax_due.amount * max_interest;
                }
                surcharge_fee.amount = tax_due.amount * surcharge;
                collection = { id: 1, items: [tax_due, surcharge_fee, interest_fee] };
            }
        }
    }
    return collection;
};
exports.amusementTax = function (amusement, tax_return, due_year, due_month, paid_at, penalty, rates) {
    var paid_month = new Date(paid_at).getMonth() + 1;
    var paid_year = new Date(paid_at).getFullYear();
    var paid_day = new Date(paid_at).getDate();
    var surcharge = penalty.surcharge, interest = penalty.interest, max_interest = penalty.max_interest;
    var interest_rate = 0;
    var collection = {};
    var surcharge_fee = {
        desc: "Surcharge",
        amount: 0
    };
    var interest_fee = {
        desc: "Interest",
        amount: 0
    };
    var tax_due_mun = {
        desc: "Amusement Tax for " + amusement.name + " (Municipality)",
        amount: tax_return * rates.municipality
    };
    var tax_due_prov = {
        desc: "Amusement Tax for " + amusement.name + " (Province)",
        amount: tax_return * rates.province
    };
    var tax_due = {
        desc: due_year + " Amusement Tax for " + amusement.name,
        amount: tax_return * rates.province
    };
    if (paid_year == due_year) {
        if (due_month + 1 == paid_month) {
            if (paid_day <= 20) {
                collection = {
                    id: amusement.id,
                    category: {
                        desc: tax_due.desc,
                        municipality: rates.municipality,
                        province: rates.province
                    },
                    business: {
                        name: amusement.name
                    },
                    items: [tax_due]
                };
            }
            else {
                interest_rate = (paid_month - due_month) * interest;
                if (interest_rate < max_interest) {
                    interest_fee.amount = tax_due.amount * interest_rate;
                }
                else {
                    interest_fee.amount = tax_due.amount * max_interest;
                }
                surcharge_fee.amount = tax_due.amount * surcharge;
                collection = {
                    id: amusement.id,
                    category: {
                        desc: tax_due.desc,
                        municipality: rates.municipality,
                        province: rates.province
                    },
                    business: {
                        name: amusement.name
                    },
                    items: [tax_due, surcharge_fee, interest_fee]
                };
            }
        }
        else if (due_month == paid_month) {
            collection = {
                id: amusement.id,
                category: {
                    desc: tax_due.desc,
                    municipality: rates.municipality,
                    province: rates.province
                },
                business: {
                    name: amusement.name
                },
                items: [tax_due]
            };
        }
        else {
            interest_rate = (paid_month - due_month) * interest;
            if (interest_rate < max_interest) {
                interest_fee.amount = tax_due.amount * interest_rate;
            }
            else {
                interest_fee.amount = tax_due.amount * max_interest;
            }
            surcharge_fee.amount = tax_due.amount * surcharge;
            collection = {
                id: amusement.id,
                category: {
                    desc: tax_due.desc,
                    municipality: rates.municipality,
                    province: rates.province
                },
                business: {
                    name: amusement.name
                },
                items: [tax_due, surcharge_fee, interest_fee]
            };
        }
    }
    else if (due_year + 1 == paid_year && due_month == 12 && paid_month == 1) {
        if (paid_day <= 20) {
            collection = {
                id: amusement.id,
                category: {
                    desc: tax_due.desc,
                    municipality: rates.municipality,
                    province: rates.province
                },
                business: {
                    name: amusement.name
                },
                items: [tax_due]
            };
        }
        else {
            interest_rate = interest;
            if (interest_rate < max_interest) {
                interest_fee.amount = tax_due.amount * interest_rate;
            }
            else {
                interest_fee.amount = tax_due.amount * max_interest;
            }
            surcharge_fee.amount = tax_due.amount * surcharge;
            collection = {
                id: amusement.id,
                category: {
                    desc: tax_due.desc,
                    municipality: rates.municipality,
                    province: rates.province
                },
                business: {
                    name: amusement.name
                },
                items: [tax_due, surcharge_fee, interest_fee]
            };
        }
    }
    else {
        interest_rate =
            ((paid_year - due_year) * 12 + paid_month - due_month) * interest;
        if (interest_rate < max_interest) {
            interest_fee.amount = tax_due.amount * interest_rate;
        }
        else {
            interest_fee.amount = tax_due.amount * max_interest;
        }
        surcharge_fee.amount = tax_due.amount * surcharge;
        collection = {
            id: amusement.id,
            category: {
                desc: tax_due.desc,
                municipality: rates.municipality,
                province: rates.province
            },
            business: {
                name: amusement.name
            },
            items: [tax_due, surcharge_fee, interest_fee]
        };
    }
    return collection;
};
exports.sandGravelTax = function (aggregate, volume, percentage) {
    var collection = {};
    var tax_due = {
        desc: "Tax Due for " + volume + " cu.m of " + aggregate.material,
        amount: volume * aggregate.rate * percentage
    };
    collection = {
        id: aggregate.id,
        category: {
            desc: tax_due.desc,
            rate: percentage,
            fair_market_value: {
                material: aggregate.material,
                value: aggregate.rate
            }
        },
        volume: volume,
        items: [tax_due]
    };
    return collection;
};
exports.spaceRentalTax = function (activity, duration, with_ac) {
    var collection = {};
    var rate = 0;
    var hour_text = "";
    if (duration <= 1) {
        hour_text = "hour";
    }
    else {
        hour_text = "hours";
    }
    if (with_ac == true) {
        rate = activity.rates.with_ac;
    }
    else {
        rate = activity.rates.wout_ac;
    }
    var tax_due = {
        desc: "Rent for " + duration + " " + hour_text + " of " + activity.activity,
        amount: duration * rate
    };
    collection = {
        id: activity.id,
        category: {
            activity: activity.activity,
            rates: activity.rates
        },
        items: [tax_due]
    };
    return collection;
};
exports.accountableForm = function (ac_form, serial_number, mark_up) {
    var collection = {};
    var start = serial_number.start, end = serial_number.end;
    var qty = end - start + 1;
    var tax_due = {
        desc: qty + " stubs of AF " + ac_form.type,
        amount: qty * ac_form.price
    };
    var markUp = {
        desc: mark_up * 100 + "% Mark Up",
        amount: tax_due.amount * mark_up
    };
    collection = {
        id: ac_form.id,
        items: [tax_due, markUp]
    };
    return collection;
};
exports.heavyEquipmentRental = function (equipment, rate, trip, unit, is_per_trip) {
    var collection = {};
    var tax_due = {};
    if (is_per_trip == true) {
        tax_due = {
            desc: "Rental of " + equipment.type + " (" + equipment.capacity + ") for " + trip + " " + unit,
            amount: rate
        };
    }
    else {
        tax_due = {
            desc: "Rental of " + equipment.type + " (" + equipment.capacity + ") for " + trip + " " + unit,
            amount: rate * trip
        };
    }
    collection = {
        id: equipment.id,
        category: {
            desc: tax_due.desc,
            type: equipment.type,
            capacity: equipment.capacity,
            rates: equipment.rates
        },
        trip: trip,
        items: [tax_due]
    };
    return collection;
};
