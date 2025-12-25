import React from "react";
import { Box, Pagination, Typography } from "@mui/material";

function SongsPagination({
                             page,
                             totalPages,
                             onChange,
                         }) {
    if (totalPages <= 1) return null;

    return (
        <Box
            sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="body2">
                Сторінка {page + 1} з {totalPages}
            </Typography>

            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(_, value) => onChange(value - 1)}
                color="primary"
                shape="rounded"
            />
        </Box>
    );
}

export default SongsPagination;
