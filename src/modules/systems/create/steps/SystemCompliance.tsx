/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import Input from 'components/Input';
import MultipleSelect from 'components/MultipleSelect';
import Select from 'components/Select';
import { perodicOptions, rolesBasedAccess } from 'utils/select';

interface SystemComplianceProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
}

const SystemCompliance = (props: SystemComplianceProps) => {
    const { formik } = props;

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Input
                label="Last Access Review Date"
                name="compliance.last_access_review_date"
                type="date"
                value={formik.values?.compliance?.last_access_review_date}
                onChange={formik.handleChange}
                error={
                    (formik.touched?.compliance?.last_access_review_date &&
                        formik.errors?.compliance?.last_access_review_date) ||
                    ''
                }
            />
            <Input
                label="Last Access Review Result"
                name="compliance.last_access_review_result"
                type="text"
                value={formik.values.compliance.last_access_review_result}
                onChange={formik.handleChange}
                error={
                    (formik.touched.compliance?.last_access_review_result &&
                        formik.errors.compliance?.last_access_review_result) ||
                    ''
                }
            />
            <Input
                label="Next Access Review Date"
                name="compliance.next_access_review_date"
                type="date"
                value={formik.values.compliance.next_access_review_date}
                onChange={formik.handleChange}
                error={
                    (formik.touched.compliance?.next_access_review_date &&
                        formik.errors.compliance?.next_access_review_date) ||
                    ''
                }
            />
            <Select
                label="Periodic Access Review"
                name="compliance.periodic_review"
                options={perodicOptions || []}
                values={formik.values.compliance.periodic_review || ''}
                onChange={formik.handleChange}
                error={
                    (formik.touched.compliance?.periodic_review &&
                        formik.errors.compliance?.periodic_review) ||
                    ''
                }
            />
            <MultipleSelect
                label="Roles Based Access Control Information"
                name="compliance.role_based_access"
                options={rolesBasedAccess || []}
                values={formik.values.compliance.role_based_access || {}}
                onChange={(values: any) => {
                    formik.setFieldValue(
                        'compliance.role_based_access',
                        values
                    );
                }}
                error={
                    (formik.touched.compliance?.role_based_access &&
                        formik.errors.compliance?.role_based_access) ||
                    ''
                }
            />
        </Box>
    );
};

export default SystemCompliance;
