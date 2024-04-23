import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// css
import "../assets/css/pagination.css";

// Pagination component props
interface PaginationProps {
  page: number;
  pageSize: number;
  totalEntries: number;
  setPage: any;
  setPageSize: any;
  entityName: string;
}

const Pagination = ({ page, pageSize, totalEntries, setPage, setPageSize, entityName }: PaginationProps) => {
  // function to handle page navigation
  const changePage = (value: number) => {
    if (value === -1 && page > 1) setPage((prev: number) => prev - 1);
    else if (value === 1 && pageSize * page < totalEntries) setPage((prev: number) => prev + 1);
  };

  return (
    <>
      <Box className="pagination-container">
        <Box className="page-selector">
          <ChevronLeftIcon className="change-page-arrow" onClick={() => changePage(-1)}></ChevronLeftIcon>
          {Math.ceil(totalEntries / pageSize) >= 8 ? (
            <>
              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={page === 1 ? "page-number selected-page" : "page-number"}
                variant="h5"
              >
                1
              </Typography>

              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={page >= 5 ? "page-number" : page === 2 ? "page-number selected-page no-hover" : "page-number"}
                variant="h5"
              >
                {page >= 5 ? "..." : 2}
              </Typography>

              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={page === 3 ? "page-number selected-page" : "page-number"}
                variant="h5"
              >
                {page >= 5 && page <= Math.ceil(totalEntries / pageSize) - 4 ? page - 1 : page < 5 ? 3 : Math.ceil(totalEntries / pageSize) - 4}
              </Typography>

              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={
                  page === 4 || page === Math.ceil(totalEntries / pageSize) - 3 || (page >= 5 && page <= Math.ceil(totalEntries / pageSize) - 4)
                    ? "page-number selected-page"
                    : "page-number"
                }
                variant="h5"
              >
                {page >= 5 && page <= Math.ceil(totalEntries / pageSize) - 4 ? page : page < 5 ? 4 : Math.ceil(totalEntries / pageSize) - 3}
              </Typography>

              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={page === Math.ceil(totalEntries / pageSize) - 2 ? "page-number selected-page" : "page-number"}
                variant="h5"
              >
                {page >= 5 && page <= Math.ceil(totalEntries / pageSize) - 4 ? page + 1 : page < 5 ? 5 : Math.ceil(totalEntries / pageSize) - 2}
              </Typography>

              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={
                  page + 3 < Math.ceil(totalEntries / pageSize)
                    ? "page-number"
                    : page === Math.ceil(totalEntries / pageSize) - 1
                    ? "page-number selected-page"
                    : "page-number"
                }
                variant="h5"
              >
                {page + 3 < Math.ceil(totalEntries / pageSize) ? "..." : Math.ceil(totalEntries / pageSize) - 1}
              </Typography>
              <Typography
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  Number(target.innerHTML) && setPage(Number(target.innerHTML));
                }}
                className={page === Math.ceil(totalEntries / pageSize) ? "page-number selected-page" : "page-number"}
                variant="h5"
              >
                {Math.ceil(totalEntries / pageSize)}
              </Typography>
            </>
          ) : (
            <>
              {Array.from(Array(Math.ceil(totalEntries / pageSize)).keys()).map((item) => (
                <Typography
                  key={item}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    Number(target.innerHTML) && setPage(Number(target.innerHTML));
                  }}
                  className={page === item + 1 ? "page-number selected-page" : "page-number"}
                  variant="h5"
                >
                  {item + 1}
                </Typography>
              ))}
            </>
          )}

          <ChevronRightIcon className="change-page-arrow" onClick={() => changePage(+1)}></ChevronRightIcon>
        </Box>
        <Box className="page-size-selector">
          <Typography variant="h6" mr="8px">
            Show:{" "}
          </Typography>
          <TextField
            select
            variant="standard"
            defaultValue={pageSize}
            value={pageSize}
            onChange={(e) => setPageSize(+e.target.value)}
            className="page-size-textbox"
          >
            <MenuItem value={10}>10 {entityName}</MenuItem>
            <MenuItem value={15}>15 {entityName}</MenuItem>
            <MenuItem value={20}>20 {entityName}</MenuItem>
          </TextField>
        </Box>
      </Box>
    </>
  );
};

export default Pagination;