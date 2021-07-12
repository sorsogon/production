export const professionalTax = (
  profession: _object,
  due_at: number,
  paid_at: string,
  penalty: _object
): _object => {
  const paid_year: any = new Date(paid_at).getFullYear();
  const paid_month: any = new Date(paid_at).getMonth() + 1;
  const { surcharge, interest, max_interest } = penalty;

  const surcharge_fee = {
    desc: "Surcharge",
    amount: 0,
  };
  const interest_fee = {
    desc: "Interest",
    amount: 0,
  };
  const tax = {
    desc: `${due_at} PTR as ${profession.title}`,
    amount: profession.rate,
  };

  let collection = {};
  let interest_rate = 0;

  if (paid_year != due_at && paid_month > 0) {
    interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
    if (interest_rate < max_interest) {
      interest_fee.amount = profession.rate * interest_rate;
    } else {
      interest_fee.amount = profession.rate * max_interest;
    }
    surcharge_fee.amount = profession.rate * surcharge;
    collection = {
      id: profession.id,
      category: {
        desc: tax.desc,
        title: profession.title,
        rate: profession.rate,
      },
      items: [tax, surcharge_fee, interest_fee],
    };
  } else if (paid_year == due_at && paid_month > 1) {
    interest_rate = paid_month * interest;
    if (interest_rate < max_interest) {
      interest_fee.amount = profession.rate * interest_rate;
    } else {
      interest_fee.amount = profession.rate * max_interest;
    }
    surcharge_fee.amount = profession.rate * surcharge;
    collection = {
      id: profession.id,
      category: {
        desc: tax.desc,
        title: profession.title,
        rate: profession.rate,
      },
      items: [tax, surcharge_fee, interest_fee],
    };
  } else {
    collection = {
      id: profession.id,
      category: {
        desc: tax.desc,
        title: profession.title,
        rate: profession.rate,
      },
      items: [tax],
    };
  }

  return collection;
};

export const annualFixedTax = (
  vehicle: _object,
  due_at: number,
  paid_at: string,
  penalty: _object
) => {
  const paid_year: any = new Date(paid_at).getFullYear();
  const paid_month: any = new Date(paid_at).getMonth() + 1;
  const { surcharge, interest, max_interest } = penalty;

  const vehicle_fee = vehicle.category.rate;

  let collection = {};
  let interest_rate = 0;

  const surcharge_fee = {
    desc: "Surcharge",
    amount: 0,
  };

  const interest_fee = {
    desc: "Interest",
    amount: 0,
  };

  const tax = {
    desc: `${due_at} Tax Due for ${vehicle.plate_number}`,
    amount: vehicle_fee,
  };

  if (paid_year != due_at && paid_month > 0) {
    interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
    if (interest_rate < max_interest) {
      interest_fee.amount = vehicle_fee * interest_rate;
    } else {
      interest_fee.amount = vehicle_fee * max_interest;
    }
    surcharge_fee.amount = vehicle_fee * surcharge;
    collection = {
      id: vehicle.id,
      category: {
        desc: tax.desc,
        category: vehicle.category,
      },
      vehicle: {
        id: vehicle.id,
        model: vehicle.model,
        plate_number: vehicle.plate_number,
      },
      plate_number: vehicle.plate_number,
      items: [tax, surcharge_fee, interest_fee],
    };
  } else if (paid_year == due_at && paid_month > 1) {
    interest_rate = paid_month * interest;
    if (interest_rate < max_interest) {
      interest_fee.amount = vehicle_fee * interest_rate;
    } else {
      interest_fee.amount = vehicle_fee * max_interest;
    }
    surcharge_fee.amount = vehicle_fee * surcharge;
    collection = {
      id: vehicle.id,
      category: {
        desc: tax.desc,
        category: vehicle.category,
      },
      vehicle: {
        id: vehicle.id,
        model: vehicle.model,
        plate_number: vehicle.plate_number,
      },
      plate_number: vehicle.plate_number,
      items: [tax, surcharge_fee, interest_fee],
    };
  } else {
    collection = {
      id: vehicle.id,
      category: {
        desc: tax.desc,
        category: vehicle.category,
      },
      vehicle: {
        id: vehicle.id,
        model: vehicle.model,
        plate_number: vehicle.plate_number,
      },
      plate_number: vehicle.plate_number,
      items: [tax],
    };
  }

  return collection;
};

export const franchiseTax = (
  franchise: _object,
  gross_annual: number,
  due_at: number,
  paid_at: string,
  penalty: _object,
  rates: _object
) => {
  const paid_month: number = new Date(paid_at).getMonth() + 1;
  const paid_year: number = new Date(paid_at).getFullYear();
  const paid_day: number = new Date(paid_at).getDate();
  const { surcharge, interest, max_interest } = penalty;
  let interest_rate = 0;
  let collection = {};

  const surcharge_fee = {
    desc: "Surcharge",
    amount: 0,
  };
  const interest_fee = {
    desc: "Interest",
    amount: 0,
  };
  const tax_due = {
    desc: `${due_at} Franchise Tax for ${franchise.name}`,
    amount: gross_annual * rates.rate,
  };

  if (paid_year != due_at) {
    if (paid_month > 0) {
      interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
      if (interest_rate < max_interest) {
        interest_fee.amount = tax_due.amount * interest_rate;
      } else {
        interest_fee.amount = tax_due.amount * max_interest;
      }
      surcharge_fee.amount = tax_due.amount * surcharge;

      collection = {
        id: franchise.id,
        category: {
          desc: tax_due.desc,
          rate: rates.rate,
        },
        business: {
          name: franchise.name,
        },
        items: [tax_due, surcharge_fee, interest_fee],
      };
    }
  } else if (paid_year == due_at) {
    if (paid_month > 0) {
      if (paid_month == 1 && paid_day <= 20) {
        collection = {
          id: franchise.id,
          category: {
            desc: tax_due.desc,
            rate: rates.rate,
          },
          business: {
            name: franchise.name,
          },
          items: [tax_due],
        };
      } else {
        interest_rate = paid_month * interest;
        if (interest_rate < max_interest) {
          interest_fee.amount = tax_due.amount * interest_rate;
        } else {
          interest_fee.amount = tax_due.amount * max_interest;
        }
        surcharge_fee.amount = tax_due.amount * surcharge;

        collection = {
          id: franchise.id,
          category: {
            desc: tax_due.desc,
            rate: rates.rate,
          },
          business: {
            name: franchise.name,
          },
          items: [tax_due, surcharge_fee, interest_fee],
        };
      }
    }
  }
  return collection;
};

export const printingTax = (
  gross_annual: number,
  paid_at: string,
  due_at: number,
  penalty: _object
) => {
  const paid_month: number = new Date(paid_at).getMonth() + 1;
  const paid_year: number = new Date(paid_at).getFullYear();
  const paid_day: number = new Date(paid_at).getDate();
  const { surcharge, interest, max_interest, tax_fee } = penalty;
  let interest_rate = 0;
  let collection = {};

  const surcharge_fee = {
    desc: "Surcharge",
    amount: 0,
  };
  const interest_fee = {
    desc: "Interest",
    amount: 0,
  };
  const tax_due = {
    desc: "Tax Due",
    amount: gross_annual * tax_fee,
  };

  if (paid_year != due_at) {
    if (paid_month > 0) {
      interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
      console.log(interest_rate);
      if (interest_rate < max_interest) {
        interest_fee.amount = tax_due.amount * interest_rate;
      } else {
        interest_fee.amount = tax_due.amount * max_interest;
      }
      surcharge_fee.amount = tax_due.amount * surcharge;

      collection = { id: 1, items: [tax_due, surcharge_fee, interest_fee] };
    }
  } else if (paid_year == due_at) {
    if (paid_month > 0) {
      if (paid_month == 1 && paid_day <= 20) {
        collection = { id: 1, items: [tax_due] };
      } else {
        interest_rate = ((paid_year - due_at) * 12 + paid_month) * interest;
        if (interest_rate < max_interest) {
          interest_fee.amount = tax_due.amount * interest_rate;
        } else {
          interest_fee.amount = tax_due.amount * max_interest;
        }
        surcharge_fee.amount = tax_due.amount * surcharge;

        collection = { id: 1, items: [tax_due, surcharge_fee, interest_fee] };
      }
    }
  }
  return collection;
};

export const amusementTax = (
  amusement: _object,
  tax_return: number,
  due_year: number,
  due_month: number,
  paid_at: string,
  penalty: _object,
  rates: _object
) => {
  const paid_month: number = new Date(paid_at).getMonth() + 1;
  const paid_year: number = new Date(paid_at).getFullYear();
  const paid_day: number = new Date(paid_at).getDate();
  const { surcharge, interest, max_interest } = penalty;
  let interest_rate = 0;
  let collection = {};

  const surcharge_fee = {
    desc: "Surcharge",
    amount: 0,
  };
  const interest_fee = {
    desc: "Interest",
    amount: 0,
  };

  const tax_due_mun = {
    desc: `Amusement Tax for ${amusement.name} (Municipality)`,
    amount: tax_return * rates.municipality,
  };

  const tax_due_prov = {
    desc: `Amusement Tax for ${amusement.name} (Province)`,
    amount: tax_return * rates.province,
  };

  const tax_due = {
    desc: `${due_year} Amusement Tax for ${amusement.name}`,
    amount: tax_return * rates.province,
    // amount: tax_due_mun.amount + tax_due_prov.amount,
  };

  if (paid_year == due_year) {
    if (due_month + 1 == paid_month) {
      if (paid_day <= 20) {
        collection = {
          id: amusement.id,
          category: {
            desc: tax_due.desc,
            municipality: rates.municipality,
            province: rates.province,
          },
          business: {
            name: amusement.name,
          },
          items: [tax_due],
        };
      } else {
        interest_rate = (paid_month - due_month) * interest;
        if (interest_rate < max_interest) {
          interest_fee.amount = tax_due.amount * interest_rate;
        } else {
          interest_fee.amount = tax_due.amount * max_interest;
        }
        surcharge_fee.amount = tax_due.amount * surcharge;

        collection = {
          id: amusement.id,
          category: {
            desc: tax_due.desc,
            municipality: rates.municipality,
            province: rates.province,
          },
          business: {
            name: amusement.name,
          },
          items: [tax_due, surcharge_fee, interest_fee],
        };
      }
    } else if (due_month == paid_month) {
      collection = {
        id: amusement.id,
        category: {
          desc: tax_due.desc,
          municipality: rates.municipality,
          province: rates.province,
        },
        business: {
          name: amusement.name,
        },
        items: [tax_due],
      };
    } else {
      interest_rate = (paid_month - due_month) * interest;
      if (interest_rate < max_interest) {
        interest_fee.amount = tax_due.amount * interest_rate;
      } else {
        interest_fee.amount = tax_due.amount * max_interest;
      }
      surcharge_fee.amount = tax_due.amount * surcharge;

      collection = {
        id: amusement.id,
        category: {
          desc: tax_due.desc,
          municipality: rates.municipality,
          province: rates.province,
        },
        business: {
          name: amusement.name,
        },
        items: [tax_due, surcharge_fee, interest_fee],
      };
    }
  } else if (due_year + 1 == paid_year && due_month == 12 && paid_month == 1) {
    if (paid_day <= 20) {
      collection = {
        id: amusement.id,
        category: {
          desc: tax_due.desc,
          municipality: rates.municipality,
          province: rates.province,
        },
        business: {
          name: amusement.name,
        },
        items: [tax_due],
      };
    } else {
      interest_rate = interest;
      if (interest_rate < max_interest) {
        interest_fee.amount = tax_due.amount * interest_rate;
      } else {
        interest_fee.amount = tax_due.amount * max_interest;
      }
      surcharge_fee.amount = tax_due.amount * surcharge;

      collection = {
        id: amusement.id,
        category: {
          desc: tax_due.desc,
          municipality: rates.municipality,
          province: rates.province,
        },
        business: {
          name: amusement.name,
        },
        items: [tax_due, surcharge_fee, interest_fee],
      };
    }
  } else {
    interest_rate =
      ((paid_year - due_year) * 12 + paid_month - due_month) * interest;
    if (interest_rate < max_interest) {
      interest_fee.amount = tax_due.amount * interest_rate;
    } else {
      interest_fee.amount = tax_due.amount * max_interest;
    }
    surcharge_fee.amount = tax_due.amount * surcharge;

    collection = {
      id: amusement.id,
      category: {
        desc: tax_due.desc,
        municipality: rates.municipality,
        province: rates.province,
      },
      business: {
        name: amusement.name,
      },
      items: [tax_due, surcharge_fee, interest_fee],
    };
  }

  return collection;
};

export const sandGravelTax = (
  aggregate: _object,
  volume: number,
  percentage: number
) => {
  let collection = {};

  const tax_due = {
    desc: `Tax Due for ${volume} cu.m of ${aggregate.material}`,
    amount: volume * aggregate.rate * percentage,
  };

  collection = {
    id: aggregate.id,
    category: {
      desc: tax_due.desc,
      rate: percentage,
      fair_market_value: {
        material: aggregate.material,
        value: aggregate.rate,
      },
    },
    volume: volume,
    items: [tax_due],
  };

  return collection;
};

export const spaceRentalTax = (
  activity: _object,
  duration: number,
  with_ac: boolean
) => {
  let collection = {};

  let rate = 0;
  let hour_text = "";

  if (duration <= 1) {
    hour_text = "hour";
  } else {
    hour_text = "hours";
  }

  if (with_ac == true) {
    rate = activity.rates.with_ac;
  } else {
    rate = activity.rates.wout_ac;
  }

  const tax_due = {
    desc: `Rent for ${duration} ${hour_text} of ${activity.activity}`,
    amount: duration * rate,
  };

  collection = {
    id: activity.id,
    category: {
      activity: activity.activity,
      rates: activity.rates,
    },
    items: [tax_due],
  };

  return collection;
};

export const accountableForm = (
  ac_form: _object,
  serial_number: _object,
  mark_up: number
) => {
  let collection = {};
  const { start, end } = serial_number;
  const qty = end - start + 1;

  const tax_due = {
    desc: `${qty} stubs of AF ${ac_form.type}`,
    amount: qty * ac_form.price,
  };

  const markUp = {
    desc: `${mark_up * 100}% Mark Up`,
    amount: tax_due.amount * mark_up,
  };

  collection = {
    id: ac_form.id,
    items: [tax_due, markUp],
  };

  return collection;
};

export const heavyEquipmentRental = (
  equipment: _object,
  rate: number,
  trip: any,
  unit: string,
  is_per_trip: boolean
) => {
  let collection = {};
  let tax_due: _object = {};

  if (is_per_trip == true) {
    tax_due = {
      desc: `Rental of ${equipment.type} (${equipment.capacity}) for ${trip} ${unit}`,
      amount: rate,
    };
  } else {
    tax_due = {
      desc: `Rental of ${equipment.type} (${equipment.capacity}) for ${trip} ${unit}`,
      amount: rate * trip,
    };
  }

  collection = {
    id: equipment.id,
    category: {
      desc: tax_due.desc,
      type: equipment.type,
      capacity: equipment.capacity,
      rates: equipment.rates,
    },
    trip: trip,
    items: [tax_due],
  };

  return collection;
};
