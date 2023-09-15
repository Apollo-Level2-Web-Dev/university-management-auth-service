import { RedisClient } from '../../../shared/redis';
import {
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    EVENT_ACADEMIC_DEPARTMENT_UPDATED
} from './academicDepartment.constants';
import {
    AcademicDepartmentCreatedEvent,
    AcademicDepartmentDeletedEvent,
    AcademicDepartmentUpdatedEvent
} from './academicDepartment.interfaces';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_CREATED, async (e: string) => {
        const data: AcademicDepartmentCreatedEvent = JSON.parse(e);

        await AcademicDepartmentService.insertIntoDBFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_UPDATED, async (e: string) => {
        const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);

        await AcademicDepartmentService.updateOneInDBFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_DELETED, async (e: string) => {
        const data: AcademicDepartmentDeletedEvent = JSON.parse(e);

        await AcademicDepartmentService.deleteOneFromDBFromEvent(data.id);
    });
};

export default initAcademicDepartmentEvents;