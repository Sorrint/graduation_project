import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/form/textField';
import { useFieldArray, useForm } from 'react-hook-form';
import TextAreaField from '../../common/form/textAreaField';
import { useDispatch, useSelector } from 'react-redux';
import { getIcons } from '../../../store/icons';
import CheckBoxField from '../../common/form/checkbox';
import { renderGuests } from '../../../utils/utils';
import { existingMethods, validator } from '../../../utils/validator';
import SelectField from '../../common/form/selectField';
import { getRoomTypes } from '../../../store/roomTypes';
import { updateRoomInfo } from '../../../store/rooms';

const transformData = (data) => {
    const amenities = data.amenities.filter((a) => a.value === true);
    const amenitiesIds = amenities.map((a) => a._id);
    const otherAmenities = Array.isArray(data.otherAmenities)
        ? data.otherAmenities.map((value) => value.trim())
        : data.otherAmenities.split(',').map((value) => value.trim());

    const priceList = Object.keys(data.priceList).reduce((obj, key) => {
        obj[key] = Number(data.priceList[key]);
        return obj;
    }, {});
    return { ...data, amenities: amenitiesIds, otherAmenities, priceList };
};

const EditRoomForm = ({ room, showPopover }) => {
    const dispatch = useDispatch();
    const { number, name, title, description, otherAmenities, priceList } = room;
    const formName = 'edit-form';
    const icons = useSelector(getIcons());
    const roomTypes = useSelector(getRoomTypes());

    const amenities = icons.filter(
        (icon) => icon.name !== 'area' && icon.name !== 'rooms' && icon.name !== 'persons' && icon.name !== 'bed'
    );
    const currentType = roomTypes.find((type) => type._id === room.type);

    const { isCapitalSymbol, isContainDigit, isNumber } = existingMethods;
    const validationSchema = {
        number: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            validate: (value) => validator(value, [isNumber])
        },
        title: {
            required: { value: true, message: 'Поле обязательно для заполнения' }
        },
        name: {
            required: { value: true, message: 'Поле обязательно для заполнения' }
        },
        description: {
            required: { value: true, message: 'Поле обязательно для заполнения' }
        },
        pricelist: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            validate: (value) => validator(value, [isNumber])
        },
        password: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            minLength: { value: 6, message: 'Длина должна быть не менее 6 символов' },
            validate: (value) => validator(value, [isCapitalSymbol, isContainDigit])
        }
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            number,
            name,
            title,
            description,
            amenities: [...amenities],
            otherAmenities: [...otherAmenities.map((a) => ' ' + a)],
            priceList: { ...priceList },
            type: currentType.value
        }
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) =>
          console.log(value, name, type)
        );
        return () => subscription.unsubscribe();
      }, [watch]);

    const { fields } = useFieldArray({
        name: 'amenities',
        control
    });

    const onSubmit = (data) => {
        const roomType = roomTypes.find((type) => type.value === data.type);
        const updateData = { ...transformData(data), _id: room._id, type: roomType._id };
        dispatch(updateRoomInfo(updateData));
        showPopover();
    };

    return (
        <div className="edit-form">
            <form className="form-container__form form-container__edit-room" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-container__title">РЕДАКТИРОВАТЬ НОМЕР</h1>
                <div className="pricelist__container">
                <TextField
                    label="Номер"
                    type="text"
                    name="number"
                    placeholder="Номер"
                    register={register('number', { ...validationSchema.number })}
                    formName={formName}
                    error={errors.number?.message}
                />
                <SelectField
                    elementName="roomTypes"
                    label="Категория номера"
                    register={register('type')}
                    name={'roomTypes'}
                    options={roomTypes}
                    defaultOption={'Выберите класс номера'}
                    wrapperName={'room-types'}
                />
                <TextField
                    label="Название"
                    type="text"
                    name="name"
                    placeholder="Номер"
                    register={register('name', { ...validationSchema.name })}
                    formName={formName}
                    error={errors.name?.message}
                />
                <TextField
                    label="Заголовок"
                    type="text"
                    name="title"
                    placeholder="Заголовок"
                    register={register('title', { ...validationSchema.title })}
                    formName={formName}
                    error={errors.title?.message}
                />
                <TextAreaField
                    rows={3}
                    label="Описание"
                    type="text"
                    name="description"
                    placeholder="Описание"
                    register={register('description', { ...validationSchema.description })}
                    error={errors.description?.message}
                    wrapperName={'room-types'}
                />
                </div>
                <div className="pricelist__container">
                    <div className="pricelist__title">Прайс-лист (цены в рублях)</div>
                    <div className="pricelist__wrapper">
                        {Object.keys(priceList).map((key) => (
                            <TextField
                                key={key}
                                label={renderGuests(key)}
                                type="text"
                                name="pricelist"
                                placeholder="Цена"
                                register={register(`priceList.${key}`, {
                                    required: { value: true, message: 'Поле обязательно для заполнения' },
                                    validate: (value) => validator(value, [isNumber])
                                })}
                                formName={formName}
                                error={errors.priceList?.[key]?.message}
                            />
                        ))}
                    </div>
                </div>
                <div className="amenities__container">
                    <div className="input-container">
                        <label className='form-label_room-types'>Удобства</label>
                        <div className="check-inputs">
                            {fields.map((field, index) => {
                                return (
                                    <CheckBoxField
                                        key={field._id}
                                        name="amenities"
                                        {...register(`amenities.${index}.value`, {
                                            value: room.amenities.findIndex((a) => a === field._id) !== -1
                                        })}
                                    >
                                        {fields[index].text}
                                    </CheckBoxField>
                                );
                            })}
                        </div>
                    </div>
                    <TextAreaField
                        rows={3}
                        label="Прочие удобства"
                        type="text"
                        name="description"
                        placeholder="Прочие удобства"
                        register={register('otherAmenities')}
                        error={errors.title?.message}
                        wrapperName={'room-types'}
                    />
                </div>
                <button className="info-button" disabled={!isValid}>
                    ОБНОВИТЬ ДАННЫЕ
                </button>
            </form>
        </div>
    );
};

EditRoomForm.propTypes = {
    room: PropTypes.object,
    showPopover: PropTypes.func
};
export default EditRoomForm;
